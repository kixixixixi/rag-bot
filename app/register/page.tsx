"use client"

import ky from "ky"
import { NextPage } from "next"
import { FormEvent, useState } from "react"

const RegisterPage: NextPage = () => {
  const [createInputList, setCreateInputList] = useState<
    { title: string; text: string }[]
  >([{ title: "", text: "" }])
  const [statusText, setStatusText] = useState<string>()
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatusText("作成中")
    try {
      for await (const createInput of createInputList) {
        await ky.post("/api/collection", { json: { ...createInput } })
      }
      setCreateInputList([])
      setStatusText(undefined)
    } catch (e) {
      setStatusText(`${e}`)
    }
  }
  return (
    <>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexFlow: "row",
          justifyContent: "center",
          minHeight: "100%",
        }}
      >
        <section
          style={{
            maxWidth: "80rem",
            width: "100%",
          }}
        >
          {statusText && (
            <p
              style={{
                padding: "2rem",
                textAlign: "center",
              }}
            >
              {statusText}
            </p>
          )}
          <button
            onClick={() =>
              setCreateInputList([{ title: "", text: "" }, ...createInputList])
            }
            style={{
              border: "none",
              margin: ".5rem 0",
              padding: ".25rem .5rem",
            }}
          >
            追加
          </button>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexFlow: "column",
              gap: ".5rem",
            }}
          >
            {createInputList.map((createInput, i) => (
              <div style={{ display: "flex", gap: ".5rem" }} key={i}>
                <input
                  value={createInput.title}
                  placeholder="Title"
                  style={{
                    flexGrow: 1,
                    padding: ".5rem",
                  }}
                  onChange={({ target: { value } }) => {
                    setCreateInputList([
                      ...createInputList.map((input, index) =>
                        index == i ? { ...createInput, title: value } : input
                      ),
                    ])
                  }}
                />
                <textarea
                  value={createInput.text}
                  placeholder="Text"
                  style={{
                    flexGrow: 2,
                    padding: ".5rem",
                  }}
                  onChange={({ target: { value } }) => {
                    setCreateInputList([
                      ...createInputList.map((input, index) =>
                        index == i ? { ...createInput, text: value } : input
                      ),
                    ])
                  }}
                />
              </div>
            ))}
            <button
              style={{
                border: "none",
                margin: ".5rem 0",
                padding: ".5rem",
                width: "100%",
              }}
            >
              作成
            </button>
          </form>
        </section>
      </div>
    </>
  )
}

export default RegisterPage
