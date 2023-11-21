import { OrganizationList } from '@clerk/nextjs'

export default function CreateOrganizationPage() {
  return (
    <OrganizationList
      hidePersonal
      afterSelectOrganizationUrl="/organizacao/:id"
      afterCreateOrganizationUrl="/organizacao/:id"
    />
  )
}
