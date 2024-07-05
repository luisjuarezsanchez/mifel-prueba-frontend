import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import axios from "axios";
import "./Table.css";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface User {
  id: number;
  name: string;
  email: string;
  website: string;
}

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Website",
      dataIndex: "website",
      key: "website",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: string, record: User) => (
        <span>
          <Button 
            type="primary"
            icon={<EditOutlined />}
            onClick={() => console.log("Edit user:", record.id)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button 
            type="primary" 
            danger
            icon={<DeleteOutlined />}
            onClick={() => console.log("Delete user:", record.id)}
          >
            Delete
          </Button>
        </span>
      ),
    },
  ];

  return (
    
    <div className="table-container">
      <Table
        columns={columns}
        dataSource={users}
        loading={loading}
        rowKey="id"
      />
    </div>
  );
};

export default UserTable;
