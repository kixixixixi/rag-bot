import { NextPage } from "next"
import { BotForm } from "../components/bot-form"

const HomePage: NextPage = () => {
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
            maxWidth: "48rem",
            width: "100%",
          }}
        >
          <h2
            style={{
              textAlign: "center",
            }}
          >
            質問してみてください
          </h2>
          <BotForm />
        </section>
      </div>
    </>
  )
}

export default HomePage
