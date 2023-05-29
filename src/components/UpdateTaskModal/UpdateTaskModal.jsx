import React from 'react';
import { Modal, Form, Input, DatePicker, Button } from 'antd';

function UpdateTaskModal({ isModalOpen, setIsModalOpen, form, handleUpdateTask, handleDeleteTask, taskId }) {
   return (
      <Modal
         title="Update Task"
         okText="Update"
         cancelText="Cancel"
         open={isModalOpen}
         onCancel={() => form.resetFields() & setIsModalOpen(!isModalOpen)}
         footer={[
            <Button key="cancel" onClick={() => setIsModalOpen(false)}>
               Cancel
            </Button>,
            <Button
               key="delete"
               type="primary"
               danger
               onClick={() => {
                  setIsModalOpen(false);
                  handleDeleteTask(taskId);
               }}
            >
               Delete Task
            </Button>,
            <Button
               key="update"
               type="primary"
               onClick={() => {
                  form.validateFields().then((values) => {
                     form.resetFields();
                     setIsModalOpen(false);
                     console.log({ ...values, id: taskId });
                     handleUpdateTask({ ...values, id: taskId });
                  });
               }}
            >
               Update
            </Button>,
         ]}
      >
         <Form form={form} layout="vertical" size="middle">
            <Form.Item
               name="title"
               label="Title"
               rules={[
                  {
                     required: true,
                     message: 'Please input the title of the task!',
                  },
               ]}
            >
               <Input />
            </Form.Item>

            <Form.Item name="description" label="Description">
               <Input.TextArea />
            </Form.Item>

            <Form.Item name="deadline" label="Deadline">
               <DatePicker format={'DD/MM/YYYY'} />
            </Form.Item>
         </Form>
      </Modal>
   );
}

export default UpdateTaskModal;
