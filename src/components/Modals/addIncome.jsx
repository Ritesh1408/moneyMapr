import React from 'react';
import {
    Button,
    Modal,
    Form,
    Input,
    DatePicker,
    Select,
} from 'antd';

const AddIncome = ({ isIncomeModalVisible, handleIncomeModalCancel, onFinish }) => {
    const [form] = Form.useForm();
  return (
    <Modal
        style={{fontWeight: 600, textAlign: "center"}}
        title="Add Income"
        open={isIncomeModalVisible}
        onCancel={handleIncomeModalCancel}
        footer={null}
    >
        <Form
            form={form}
            layout='vertical'
            onFinish={(values) => {
                onFinish(values, "income")
                form.resetFields();
            }}
        >
            <Form.Item
                style={{fontWeight: 600}}
                label="Name"
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Please input the name!',
                    },
                ]}
            >
                <Input className='custom-input' type='text' placeholder='Enter Name' />
            </Form.Item>

            <Form.Item
                style={{fontWeight: 600}}
                label="Amount"
                name="amount"
                rules={[
                    {
                        required: true,
                        message: 'Please input the amount!',
                    },
                ]}
            >
                <Input className='custom-input' type='number' placeholder='Enter Amount' />
            </Form.Item>
            <Form.Item
                style={{fontWeight: 600}}
                label="Category"
                name="category"
                rules={[
                    {
                        required: true,
                        message: 'Please select a category!',
                    },
                ]}
            >
                <Select placeholder='Select Category' style={{padding: "0px"}}>
                    <Select.Option value="salary">Salary</Select.Option>
                    <Select.Option value="business">Business</Select.Option>
                    <Select.Option value="investment">Investment</Select.Option>
                    <Select.Option value="other">Other</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                style={{fontWeight: 600}}
                label="Date"
                name="date"
                rules={[
                    {
                        required: true,
                        message: 'Please select a date!',
                    },
                ]}
            >
                <DatePicker className='custom-input' placeholder='Select Date' format="YYYY-MM-DD" />
            </Form.Item>
            <Button
                type="primary"
                htmlType="submit"
                className='custom-button'
                style={{width: '100%', marginTop: '20px'}}
            >
                Add Income
            </Button>

            <Button
                type="default"
                onClick={handleIncomeModalCancel}
                className='custom-button'
                style={{width: '100%', marginTop: '10px'}}
            >
                Cancel
            </Button>
        </Form>
    </Modal>
  )
}

export default AddIncome;


