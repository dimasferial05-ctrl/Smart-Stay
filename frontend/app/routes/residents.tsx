import ResidentFeature from "@/features/resident";
import type { Route } from "./+types/residents";

export const meta = ({}: Route.MetaArgs) => {
  return [
    { title: "Resident" },
    { name: "description", content: "Resident management" },
  ];
};

const Resident = () => {
  return <ResidentFeature />;
};

export default Resident;
