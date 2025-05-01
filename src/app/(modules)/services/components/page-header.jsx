
import BreadcrumbComponent from "@/components/breadcrumb"
import { Button } from "@/components/ui/button"  // Assuming you have a Button component in your UI

export default function PageHeader() {
  return (
    <div className="flex flex-col">
      {/* Page Title and Create Record Button */}
      <div className="flex flex-col md:flex-row items-center justify-between">
        <h1 className="text-2xl font-bold">Services</h1>
        <Button className="mt-4 md:mt-0">Create Record</Button>
      </div>

      {/* Breadcrumb */}
      <BreadcrumbComponent />
    </div>
  )
}
