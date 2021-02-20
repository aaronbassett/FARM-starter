import "./App.css"

import { Button, Col, Divider, Form, Input, Row, Timeline } from "antd"
import { CheckCircleOutlined, MinusCircleOutlined } from "@ant-design/icons"

function App() {
  const formLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  }

  const formLayoutTail = {
    wrapperCol: { offset: 8, span: 16 },
  }

  const onFinish = () => {
    return
  }

  return (
    <>
      <div className={"content"}>
        <Divider>FARM Stack TODO App</Divider>
        <Row gutter={16}>
          <Col span={6}>
            <Form {...formLayout} name="todoForm" onFinish={onFinish}>
              <Form.Item
                label="TODO Item"
                name="TODOItem"
                rules={[{ required: true, message: "Please input a TODO" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item {...formLayoutTail}>
                <Button type="primary" htmlType="submit">
                  Add New Todo
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col span={18}>
            <Timeline mode="alternate">
              <Timeline.Item
                dot={<MinusCircleOutlined />}
                color="blue"
                style={{ textDecoration: "initial" }}
              >
                Task Name <small>(123)</small>
              </Timeline.Item>
            </Timeline>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default App
