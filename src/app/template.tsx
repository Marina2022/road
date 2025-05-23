import TemplateTest from "@/components/TemplateTest";

export default function Template({children}: { children: React.ReactNode }) {


  return <div>{children}

    <TemplateTest/>
  </div>
}