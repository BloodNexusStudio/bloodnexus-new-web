import MissionControlForm from "@/components/home/MissionControlForm";

export const metadata = {
  title: "Contact Us — BloodNexus Studio",
  description:
    "Get in touch with BloodNexus Studio Thane. Initialize your project, game development, or VR inquiry here.",
};

export default function ContactPage() {
  return (
    <div style={{ paddingTop: "var(--header-h)" }}>
      <MissionControlForm />
    </div>
  );
}
