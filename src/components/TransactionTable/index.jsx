import { Radio, Select, Table } from 'antd';
import React, { useState } from 'react';
import SearchIcon from '../../assets/searchIcon.svg';
import './styles.css';
import { parse, unparse } from 'papaparse';
import { toast } from 'react-toastify';

const TransactionsTable = ({ transactions, addTransaction, fetchTransactions }) => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Tag',
      dataIndex: 'tag',
      key: 'tag',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
  ];

  // let filteredTransactions = transactions.filter((transaction) => transaction.name.toLowerCase().includes(search.toLowerCase()) && transaction.type.includes(typeFilter)
  // );
  let filteredTransactions = transactions.filter((transaction) => {
    const name = transaction.name?.toLowerCase() || "";
    const type = transaction.type || "";
    return name.includes(search.toLowerCase()) && type.includes(typeFilter);
  });
  

  let sortedTransactions = filteredTransactions.sort((a, b) => {
    if (sortKey === "amount") {
      return a.amount - b.amount;
    } else if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    } else {
      return 0;
    }
  });

  const exportToCSV = () => {
    const csv = unparse({
      fields: ["name", "amount", "tag", "type", "date"],
      data: sortedTransactions
    });
  
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'transactions.csv');
    document.body.appendChild(link);  
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);  
  };


  // const importfromCSV = (e) => {
  //   e.preventDefault();
  //   try {
  //     parse(e.target.files[0], {
  //       headers: true,
  //       complete: async (results) => {
  //         for (const transaction of results.data) {
  //           console.log("transaction", transaction);
  //           const newTransaction = {
  //             ...transaction,
  //             amount: parseFloat(transaction.amount),
  //           };
  //           await addTransaction(newTransaction, true);
  //         }
  //       },
  //       error: (error) => {
  //         console.error('Error parsing CSV file:', error);
  //       },
  //     });
  //     toast.success('CSV file imported successfully!');
  //     fetchTransactions();
  //     e.target.value = null;
      
  //   } catch (error) {
  //     toast.error('Error importing CSV file. Please check the file format.');
  //     console.error('Error importing CSV file:', error);
  //   }
  // }

  const importfromCSV = (e) => {
    e.preventDefault();
  
    try {
      parse(e.target.files[0], {
        header: true, // ✅ Corrected
        skipEmptyLines: true,
        complete: async (results) => {
          let skipped = 0;
  
          for (let i = 0; i < results.data.length; i++) {
            const raw = results.data[i];
            const transaction = {
              name: raw.name?.trim() || "",
              tag: raw.tag?.trim() || "",
              type: raw.type?.trim() || "",
              date: raw.date?.trim() || "",
              amount: parseFloat(raw.amount),
            };
  
            const isValid =
              transaction.name &&
              !isNaN(transaction.amount) &&
              transaction.type &&
              transaction.date;
  
            if (!isValid) {
              console.warn(`Skipping row ${i + 2}: Invalid data`, transaction);
              skipped++;
              continue;
            }
  
            try {
              await addTransaction(transaction, true);
            } catch (err) {
              console.error(`Failed to add transaction at row ${i + 2}:`, err);
              skipped++;
            }
          }
  
          toast.success('CSV file imported successfully!');
          if (skipped > 0) {
            toast.warn(`${skipped} row(s) were skipped due to invalid data.`);
          }
  
          fetchTransactions();
          e.target.value = null;
        },
        error: (error) => {
          toast.error('Error parsing CSV file.');
          console.error('Error parsing CSV file:', error);
        },
      });
    } catch (error) {
      toast.error('Error importing CSV file. Please check the file format.');
      console.error('Error importing CSV file:', error);
    }
  };
  

  return (
    <>
      <div 
        style={{
          width: '95%',
          padding: '0rem 2rem',
        }}
      >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '1rem',
              alignItems: 'center',
              marginBottom: '1rem',
            }}
          
          >
          <div className="input-flex">
            <img src={SearchIcon} width={16} />
            <input 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search transactions by name"
            />
          </div>

          <Select
            className='select-input'
            onChange={(value) => setTypeFilter(value)}
            value={typeFilter}
            placeholder="Filter"
            allowClear
          >
            <Select.Option value="">All</Select.Option>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>

        </div>

          <div className="my-table">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
              }}
            
            >
              <h2>My Transactions</h2>
              <Radio.Group
                onChange={(e) => setSortKey(e.target.value)}
                value={sortKey}
                style={{ marginLeft: '20px' }}
              >
                <Radio value="">No Sort</Radio>
                <Radio value="amount">Sort by Amount</Radio>
                <Radio value="date">Sort by Date</Radio>
              </Radio.Group>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '1rem',
                  width: '480px'
                }}
              >
                <button className='btn' onClick={exportToCSV}>Export to CSV</button>
                <label for="file-csv" className='btn btn-blue'>Import from CSV</label>
                <input type="file" id="file-csv" accept=".csv" required 
                onChange={importfromCSV}
                style={{ display: 'none' }} />

              </div>

            </div>
          </div>

        <Table dataSource={sortedTransactions} 
          columns={columns} 
        />
      </div>

    </>
  );
};

export default TransactionsTable;
