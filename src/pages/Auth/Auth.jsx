import React, { useContext, useEffect, useState } from 'react';
import { Form, Input, Button, Radio } from 'antd';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../../context/UserContext';
import { AppContext } from '../../context/AppContext';

import styles from './Auth.module.css';

const Auth = () => {
   const { handleLogin, handleRegister } = useContext(UserContext);
   const { loader, isLoggedin } = useContext(AppContext);

   const [form] = Form.useForm();
   const [activeTab, setActiveTab] = useState(0); // 0 for login, 1 for signup

   const navigate = useNavigate();

   useEffect(() => {
      console.log('isLoggedin', isLoggedin);
      if (isLoggedin) {
         navigate('/');
      }
   }, [isLoggedin]);

   return (
      <div className={styles.authContainer}>
         <div className={styles.authTabs}>
            <Radio.Group defaultValue={0} buttonStyle="solid" onChange={(e) => setActiveTab(e.target.value)}>
               <Radio.Button value={0}>Login</Radio.Button>
               <Radio.Button value={1}>Signup</Radio.Button>
            </Radio.Group>
         </div>

         <div className={styles.authBox}>
            {activeTab === 0 && (
               <Form form={form} onFinish={handleLogin} layout="vertical">
                  <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your email' }]}>
                     <Input type="email" />
                  </Form.Item>
                  <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
                     <Input.Password />
                  </Form.Item>
                  <Form.Item>
                     <Button type="primary" htmlType="submit" loading={loader}>
                        Login
                     </Button>
                  </Form.Item>
               </Form>
            )}
            {activeTab === 1 && (
               <Form form={form} onFinish={handleRegister} layout="vertical">
                  <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter your name' }]}>
                     <Input />
                  </Form.Item>
                  <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your email' }]}>
                     <Input type="email" />
                  </Form.Item>
                  <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
                     <Input.Password />
                  </Form.Item>
                  <Form.Item label="Confirm Password" name="confirmPassword" rules={[{ required: true, message: 'Please confirm your password' }]}>
                     <Input.Password />
                  </Form.Item>
                  <Form.Item>
                     <Button type="primary" htmlType="submit" loading={loader}>
                        Signup
                     </Button>
                  </Form.Item>
               </Form>
            )}
         </div>
      </div>
   );
};

export default Auth;
