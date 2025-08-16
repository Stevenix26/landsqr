import { renderHook, act } from "@testing-library/react-hooks";
import { useUsers } from "./useUser";

describe("useUsers hook", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should fetch users and set them in state (positive)", async () => {
    // Mock fetch
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => [
        {
          id: "1",
          organization: "Org",
          username: "user1",
          email: "user1@test.com",
          phoneNumber: "1234567890",
          dateJoined: "2023-01-01",
          status: "Active",
          profileImage: "",
          userInfo: {
            fullName: "User One",
            bvn: "123",
            gender: "Male",
            maritalStatus: "Single",
            children: "0",
            typeOfResidence: "Rented",
            levelOfEducation: "BSc",
          },
          employmentInfo: {
            levelOfEducation: "BSc",
            employmentStatus: "Employed",
            sectorOfEmployment: "Tech",
            durationOfEmployment: "1 year",
            officeEmail: "office@test.com",
            monthlyIncome: "1000",
            loanRepayment: "100",
          },
          socials: {
            twitter: "@user1",
            facebook: "user1fb",
            instagram: "user1ig",
          },
          guarantors: [],
          userTier: 1,
          accountBalance: "1000",
          bankName: "Bank",
          accountNumber: 123456,
        },
      ],
    });

    const { result, waitForNextUpdate } = renderHook(() => useUsers());
    await waitForNextUpdate();
    expect(result.current.users.length).toBe(1);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it("should handle fetch error (negative)", async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 500 });
    const { result, waitForNextUpdate } = renderHook(() => useUsers());
    await waitForNextUpdate();
    expect(result.current.users.length).toBe(0);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toContain("Failed to fetch users");
  });
});
