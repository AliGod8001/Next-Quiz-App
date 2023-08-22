import CustomBreadcrumb from "@/components/ui/breadcrumb/CustomBreadcrumb";

const InnerGroupLayout = ({
  children
} : {
  children: React.ReactNode
}) => {
  return <>
    <CustomBreadcrumb />
    <>{children}</>
  </>
}

export default InnerGroupLayout;