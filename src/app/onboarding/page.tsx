import { AcesOnboarding } from "@/components/aces-onboarding";
import { onboardingSteps } from "@/lib/data";

export default function OnboardingPage() {
  return <AcesOnboarding steps={onboardingSteps} />;
}
