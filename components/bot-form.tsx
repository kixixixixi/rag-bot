"use client"

import ky from "ky"
import { useState, type FC, type FormEvent } from "react"

type CompletionResult = {
  content: string | undefined
  points: {
    score: number
    payload: {
      text: string
      title: string
    }
  }[]
}

export const BotForm: FC = () => {
  const [inputText, setInputText] = useState<string>("")
  const [statusText, setStatusText] = useState<string>()
  const [completionResult, setCompletionResult] = useState<CompletionResult>()
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (inputText.length < 10) return
    try {
      setStatusText("処理中")
      setCompletionResult(undefined)
      const response = await ky.post("/api/completion", {
        json: { text: inputText },
      })
      const result = await response.json<CompletionResult>()
      setCompletionResult(result)
      setStatusText(undefined)
    } catch (e) {
      setStatusText(`${e}`)
    }
  }
  return (
    <>
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
      <form
        style={{
          display: "flex",
          gap: ".5rem",
          padding: "2rem",
        }}
        onSubmit={handleSubmit}
      >
        <textarea
          style={{
            background: "#eee",
            border: "none",
            flexGrow: 1,
            padding: ".5rem",
          }}
          value={inputText}
          onChange={({ target: { value } }) => setInputText(value)}
          minLength={10}
        />
        <button
          style={{
            background: "#eee",
            border: "none",
            padding: ".5rem",
          }}
        >
          質問する
        </button>
      </form>
      {completionResult && (
        <div
          style={{
            padding: "1rem",
          }}
        >
          {completionResult.content ? (
            <>
              <p style={{ textAlign: "center" }}>生成した答え</p>
              <pre
                style={{
                  fontSize: "1.25rem",
                  lineHeight: 2,
                  padding: ".5rem",
                  textWrap: "wrap",
                }}
              >
                {completionResult.content}
              </pre>
              <br />
              <p>生成に利用した政策内容</p>
              <div
                style={{
                  display: "flex",
                  gap: ".5rem",
                  padding: ".5rem",
                }}
              >
                {completionResult.points.map((point, i) => (
                  <div
                    key={i}
                    style={{
                      border: "solid 1px #ccc",
                      borderRadius: ".5rem",
                      padding: ".25rem .5rem",
                      width: "50%",
                    }}
                  >
                    <p style={{ fontSize: ".9rem", paddingBottom: ".25rem" }}>
                      {point.payload.title}
                    </p>
                    <p style={{ fontSize: ".75rem" }}>{point.payload.text}</p>
                    <p style={{ fontSize: ".6rem", textAlign: "right" }}>
                      {(point.score * 100).toPrecision(4)}%
                    </p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p
              style={{
                textAlign: "center",
              }}
            >
              質問に近しい政策が見つかりませんでした。
              <br />
              詳しくは政策の詳細をご確認ください。
            </p>
          )}
        </div>
      )}
    </>
  )
}
