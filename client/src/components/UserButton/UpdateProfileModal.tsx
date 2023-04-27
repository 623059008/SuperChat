import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { saveUserData, getUserData } from '../../utils/storage';

interface User {
  username: string;
  email: string;
  password: string;
}

interface ProfileUpdateModalProps {
  visible: boolean;
  onCancel: () => void;
  onUpdate: (user: User) => void;
}

const ProfileUpdateModal: React.FC<ProfileUpdateModalProps> = ({ visible, onCancel, onUpdate }) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const username = getUserData()?.username || '';
  const email = getUserData()?.email || '';
  const password = getUserData()?.password || '';

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setConfirmLoading(true);
      onUpdate(values);
      message.success('Profile updated successfully!');
      setConfirmLoading(false);
    } catch (error) {
      console.log('Failed:', error);
    }
  };
  useEffect(() => {
    // init form values
    form.setFieldsValue({
      username,
      email,
      password,
    });
  })

  return (
    <Modal
      open={visible}
      title="Update Profile"
      okText="Update"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={handleOk}
      confirmLoading={confirmLoading}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please enter your username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please enter your email!' }]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please enter your password!' }]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProfileUpdateModal;
