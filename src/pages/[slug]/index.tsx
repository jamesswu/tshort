import { type NextPage } from "next";
import { useRouter } from "next/router"

const Short: NextPage = () => {
  const { query } = useRouter();
  return (
    <div>{query.slug}</div>
  )
}

export default Short;