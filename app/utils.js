import React, { Component } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get, pickBy } from "lodash";
// import permissions from "./permissions";
// ssssss
import { updateToken } from "./request";


const getArr = (obj, ltr) => get(obj, ltr) || [];

const getUser = () => {
  const storedUser = AsyncStorage.getItem("user");
  if (!storedUser) return null;

  // const cipher = CryptoJS.AES.decrypt(storedUser, "1e7d66861419ab410c2f182ad1a7bda4345e2c569c0372b2bad5c5f7711d695725fbe23969484b2de4bd2cad1325ae2db75debca864b22b636a84c89d714dc82");
  // const data = JSON.parse(cipher.toString(CryptoJS.enc.Utf8));
  // const userNave= [
  //   "dashboard", "Appointment"
  // ]
  // data["userNav"] =userNave
// console.log(data, "dataaa")  
  return storedUser;
  
};

console.log(getUser(), "getUser")


const getLanguage = () => {
  const storedUser = AsyncStorage.getItem("language");
  console.log(storedUser, "storedusers");
  if (!storedUser) return null;
  return storedUser;
};

const getAccessToken = () => {
  return AsyncStorage.getItem("token");
};

const isApproved = "APPROVED";
const isPending = "PENDING";
const isRejected = "REJECTED";
console.log(AsyncStorage.token, "token");

const updateAccessToken = () =>
  updateToken(get(getUser(), "token") /*getAccessToken()*/);

const getGroups = () => getArr(getUser(), "groups");
console.log(getGroups(), "groups");

const isAdmin = () =>
  getGroups().findIndex((_item) => _item === "ADMIN") !== -1;
console.log(isAdmin(), "admin");

const setUser = (data) => {
  // console.log("1e7d66861419ab410c2f182ad1a7bda4345e2c569c0372b2bad5c5f7711d695725fbe23969484b2de4bd2cad1325ae2db75debca864b22b636a84c89d714dc82", "the data in setuser");
  // var ciphertext = CryptoJS.AES.encrypt(
  //   JSON.stringify(data),
  //   "1e7d66861419ab410c2f182ad1a7bda4345e2c569c0372b2bad5c5f7711d695725fbe23969484b2de4bd2cad1325ae2db75debca864b22b636a84c89d714dc82"
  // ).toString();
  // console.log(ciphertext, "ciphertext");
  AsyncStorage.setItem("user", data);
};




const isStudent = () =>
  getGroups().findIndex((_item) => _item === "STUDENT") !== -1;

console.log(isStudent(), "student");

// const getPermissions = (group = get(getGroups(), "0")) => {
// //   console.log(get(permissions, group), "Groups");

// //   return get(permissions, group);
// };

const cleanObject = (object) =>
  pickBy(
    object,
    (value, key) => !(value === undefined || value === "" || value === null)
  );

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !!getAccessToken() ? (
          <Component {...props} />
        ) : (
          <Navigate to="/" />
        )
      }
    />
  );
};

// This component can be extracted to a separate file later in the development process

class ProtectedComponents extends Component {
  render() {
    // If the user is not already logged in redirect him to the /login
    // For now I'm using getAccessToken() to check if the user is authenticated or not.
    return getAccessToken() ? this.props.children : <Navigate to="/home" />;
  }
}
export {
  getArr,
  getAccessToken,
  PrivateRoute,
  getGroups,
  isAdmin,
  isStudent,
//   getPermissions,
  getUser,
  ProtectedComponents,
  cleanObject,
  updateAccessToken,
  getLanguage,
  isApproved,
  isPending,
  isRejected,
   setUser

};
