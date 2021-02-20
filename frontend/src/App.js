import "./App.css"

import { Button, Col, Divider, Form, Input, Row, Timeline } from "antd"
import {
  CheckCircleOutlined,
  DeleteOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons"
import { useEffect, useState } from "react"

function App() {
  const [newTask, setNewTask] = useState("")
  const [tasks, setTasks] = useState([])
  const [timeline, setTimeline] = useState([])

  const formLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
  }

  const formLayoutTail = {
    wrapperCol: { offset: 11, span: 13 },
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
          dot={
            <CheckCircleOutlined
              onClick={() => changeTaskStatus(task._id, false)}
            />
          }
          color="green"
          style={{ textDecoration: "line-through", color: "green" }}
        >
          {task.name} <small>({task._id})</small>{" "}
          <DeleteOutlined
            style={{ color: "red" }}
            onClick={() => deleteTask(task._id)}
          />
        </Timeline.Item>
      ) : (
        <Timeline.Item
          dot={
            <MinusCircleOutlined
              onClick={() => changeTaskStatus(task._id, true)}
            />
          }
          color="blue"
          style={{ textDecoration: "initial" }}
        >
          {task.name} <small>({task._id})</small>{" "}
          <DeleteOutlined
            style={{ color: "red" }}
            onClick={() => deleteTask(task._id)}
          />
        </Timeline.Item>
      )
    })

    setTimeline(timelineItems)
  }, [tasks])

  const saveTask = async () => {
    if (newTask) {
      await fetch("/task/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newTask,
          completed: false,
        }),
      })
    }
  }

  const changeTaskStatus = async (taskId, status) => {
    await fetch(`/task/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: status,
      }),
    })
  }

  const deleteTask = async (taskId) => {
    await fetch(`/task/${taskId}`, {
      method: "DELETE",
    })
  }

  return (
    <>
      <div className={"content"}>
        <Divider>FARM Stack TODO App</Divider>
        <Row gutter={16}>
          <Col span={6}>
            <Form {...formLayout} name="todoForm">
              <Form.Item
                label="TODO Item"
                name="TODOItem"
                rules={[{ required: true, message: "Please input a TODO" }]}
              >
                <Input
                  allowClear={true}
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                />
              </Form.Item>

              <Form.Item {...formLayoutTail}>
                <Button type="primary" htmlType="submit" onClick={saveTask}>
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
