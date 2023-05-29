import React from 'react';

import { Modal, Form, Input, DatePicker } from 'antd';

function CreateTaskModal({ isModalOpen, setisModalOpen, form, handleCreateTask }) {
   return (
      <Modal
         title="Add New Task"
         okText="Create"
         cancelText="Cancel"
         open={isModalOpen}
         onOk={() => {
            form.validateFields().then((values) => {
               form.resetFields();
               setisModalOpen(!isModalOpen);
               handleCreateTask(values);
            });
         }}
         onCancel={() => form.resetFields() & setisModalOpen(!isModalOpen)}
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
               <Input type="textarea" />
            </Form.Item>

            <Form.Item name="deadline" label="Deadline">
               <DatePicker format={"DD/MM/YYYY"} />
            </Form.Item>
         </Form>
      </Modal>
   );
}

export default CreateTaskModal;
