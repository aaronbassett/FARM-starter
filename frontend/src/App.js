import "./App.css"

import { Button, Col, Divider, Form, Input, Row, Timeline } from "antd"
import { CheckCircleOutlined, MinusCircleOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"

function App() {
  const [tasks, setTasks] = useState([])
  const [timeline, setTimeline] = useState([])

  const formLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  }

  const formLayoutTail = {
    wrapperCol: { offset: 8, span: 16 },
  }

  useEffect(() => {
    const fetchAllTasks = async () => {
      const response = await fetch("/task/")
      const fetchedTasks = await response.json()
      setTasks(fetchedTasks)
    }

    const interval = setInterval(fetchAllTasks, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    const timelineItems = tasks.reverse().map((task) => {
      return task.completed ? (
        <Timeline.Item
          dot={<CheckCircleOutlined />}
          color="green"
          style={{ textDecoration: "line-through", color: "green" }}
        >
          {task.name} <small>({task._id})</small>
        </Timeline.Item>
      ) : (
        <Timeline.Item
          dot={<MinusCircleOutlined />}
          color="blue"
          style={{ textDecoration: "initial" }}
        >
          {task.name} <small>({task._id})</small>
        </Timeline.Item>
      )
    })

    setTimeline(timelineItems)
  }, [tasks])

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
            <Timeline mode="alternate">{timeline}</Timeline>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default App
