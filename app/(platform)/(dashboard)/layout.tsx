import { Navbar } from './_components/Navbar'

const DashLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}

export default DashLayout
