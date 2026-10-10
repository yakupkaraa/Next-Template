export type MockRole = "admin" | "user"

export const MOCK_SESSION_ROLE: MockRole = "admin"

export function getCurrentUser(): { id: string; name: string; role: MockRole } {
  return MOCK_SESSION_ROLE === "admin"
    ? { id: "user-yakup", name: "Yakup K.", role: "admin" }
    : { id: "user-ece", name: "Ece Polat", role: "user" }
}
