import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Menu from "./Menu";
import CustomDrawer from "./CustomDrawer";

const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={ props=> <CustomDrawer {...props}/>}>
      <Drawer.Screen
        name="Menu"
        component={Menu}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
