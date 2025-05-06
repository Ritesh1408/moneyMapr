import React from 'react'
import {
    Button,
    Modal,
    Form,
    Input,
    DatePicker,
    Select,
} from 'antd';

const AddExpense = ({ isExpenseModalVisible, handleExpenseModalCancel, onFinish}) => {
    const [form] = Form.useForm();
  return (
    <Modal
        style={{fontWeight: 600, textAlign: "center"}}
        title="Add Expense"
        open={isExpenseModalVisible}
        onCancel={handleExpenseModalCancel}
        footer={null}
    >
        <Form
            form={form}
            layout='vertical'
            onFinish={(values) => {
                onFinish(values, "expense")
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
                    <Select.Option value="food">Food</Select.Option>
                    <Select.Option value="transport">Transport</Select.Option>
                    <Select.Option value="entertainment">Entertainment</Select.Option>
                    <Select.Option value="utilities">Utilities</Select.Option>
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
                <DatePicker className='custom-input' format="YYYY-MM-DD" style={{ width: '100%' }} />
            </Form.Item>

            <Button type='primary' htmlType='submit' style={{width: '100%', marginTop: '10px'}}>Add Expense</Button>
            <Button type='default' onClick={handleExpenseModalCancel} style={{width: '100%', marginTop: '10px'}}>Cancel</Button>
        </Form>

    </Modal>
  )
}

export default AddExpense;


