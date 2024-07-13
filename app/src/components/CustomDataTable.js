import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import {DataTable, Button} from 'react-native-paper';
import {Swipeable} from 'react-native-gesture-handler';

const CustomDataTable = ({
  title,
  columns,
  data,
  onEdit,
  onDelete,
  onRowPress,
  getCellStyle,
}) => {
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [openRowIndex, setOpenRowIndex] = useState(null);
  const itemsPerPage = 11; // Adjust as per your requirement

  useEffect(() => {
    applySearch();
  }, [searchQuery, data]);

  const applySearch = () => {
    const searchedData = data.filter(item =>
      columns.some(column =>
        (item[column.field]?.toString() || '')
          .toLowerCase()
          .includes(searchQuery.toLowerCase()),
      ),
    );
    setFilteredData(searchedData);
    setPage(0); // Reset page when applying search
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if ((page + 1) * itemsPerPage < filteredData.length) {
      setPage(page + 1);
    }
  };

  const renderRightActions = (row, rowIndex) => (
    <View style={styles.rowActions}>
      <TouchableOpacity
        onPress={() => onEdit(row, rowIndex)}
        style={styles.editButton}>
        <Text style={styles.actionText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onDelete(row, rowIndex)}
        style={styles.deleteButton}>
        <Text style={styles.actionText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const handleSwipeableOpen = rowIndex => {
    if (openRowIndex !== null && openRowIndex !== rowIndex) {
      setOpenRowIndex(null); // Close the previously opened row
    }
    setOpenRowIndex(rowIndex); // Set the currently opened row
  };

  const handleSwipeableClose = () => {
    setOpenRowIndex(null); // Close the currently opened row
  };

  const startIndex = page * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onBlur={applySearch} // Apply search on blur (optional)
      />
      <DataTable>
        <DataTable.Header style={styles.header}>
          {columns.map((column, index) => (
            <DataTable.Title
              key={index}
              numeric={column.numeric}
              style={styles.titleColumn}>
              {column.label}
            </DataTable.Title>
          ))}
        </DataTable.Header>

        {filteredData.slice(startIndex, endIndex).map((row, rowIndex) => (
          <Swipeable
            key={rowIndex}
            renderRightActions={() => renderRightActions(row, rowIndex)}
            onSwipeableOpen={() => handleSwipeableOpen(rowIndex)}
            onSwipeableClose={handleSwipeableClose}
            friction={2}
            leftThreshold={40}
            rightThreshold={40}>
            <TouchableOpacity onPress={() => onRowPress(row)}>
              <DataTable.Row
                style={[
                  styles.row,
                  openRowIndex === rowIndex && styles.swipedRow,
                ]}>
                {columns.map((column, colIndex) => (
                  <DataTable.Cell
                    key={colIndex}
                    numeric={column.numeric}
                    style={styles.cell}>
                    <Text
                      style={[
                        styles.cellText,
                        getCellStyle ? getCellStyle(column.field, row[column.field], row) : {},
                      ]}>
                      {row[column.field]}
                    </Text>
                  </DataTable.Cell>
                ))}
              </DataTable.Row>
            </TouchableOpacity>
          </Swipeable>
        ))}
      </DataTable>

      <View style={styles.pagination}>
        <Button onPress={handlePreviousPage} disabled={page === 0}>
          Previous
        </Button>
        <Button
          onPress={handleNextPage}
          disabled={(page + 1) * itemsPerPage >= filteredData.length}>
          Next
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  searchInput: {
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  header: {
    backgroundColor: '#f1f1f1',
  },
  titleColumn: {
    color: '#333',
    fontWeight: 'bold', // Adjust the font size for header
  },
  row: {
    backgroundColor: '#fff',
  },
  swipedRow: {
    backgroundColor: '#f9f9f9',
  },
  cell: {
    color: '#000',
    paddingVertical: 10,
  },
  cellText: {
    fontSize: 12, // Adjust the font size for cell text
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  rowActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    color: 'white',
    fontWeight: 'bold',
    paddingHorizontal: 10,
    fontSize: 14, // Adjust the font size for action text
  },
  editButton: {
    backgroundColor: '#4caf50',
    marginRight: 8,
    paddingVertical: 5,
    borderRadius: 3,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    paddingVertical: 5,
    borderRadius: 3,
  },
});

export default CustomDataTable;
