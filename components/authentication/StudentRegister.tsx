import Title from "./Title"
import { useEffect, useState } from "react"
import RegisterViaGoogle from "./RegisterViaGoogle"

type Props = { isLoggedIn: boolean }

export default function StudentRegister({ isLoggedIn }: Props) {
  const [isToggleForm, setIsToggleForm] = useState(isLoggedIn)

  const handleToggleForm = () => {
    setIsToggleForm((prev) => !prev)
  }

  useEffect(() => {
    setIsToggleForm(isLoggedIn)
  }, [isLoggedIn])

  return (
    <div className="flex flex-col w-[280px] mt-[30px]">
      <Title title="สร้างบัญชีสำหรับ" highlightText="นิสิต" highlightColor="#FF66C4" />
      <p className="mt-[22px] text-sm">ใช้อีเมลจุฬาฯ เพื่อยืนยันสถานภาพการเป็นนิสิต</p>

      <div className="mt-[25px] text-[#64748B] leading-6 text-sm w-full">
        <RegisterViaGoogle handleToggleForm={handleToggleForm} isToggleForm={isToggleForm} />
      </div>
    </div>
  )
}
