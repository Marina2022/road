import React from 'react';
import CardCompact from "@/components/shared/Card-compact";
import OrganizationCreateForm from "@/features/organization/components/OrganizationCreateForm";

const Page = () => {
  return (
    <div className="flex flex-1 flex-col justify-center align-items-center items-center">
      <CardCompact
        title="Create Organization"
        description="Create an organization to get started"
        className="w-full max-w-[420px] animate-fade-in"
        content={<OrganizationCreateForm />}
      />
    </div>
  );
};

export default Page;