const func = jest.fn(
    () => {}
)

it("test 1", () => {
    func();
    expect(func).toBeTruthy();
}

)
it("test 2", () => {
    const val = 2;
    expect(val).toBe(2);
}

)
it("Test mot de passe", () => {
    func.mockName("Bad");
    expect(func.getMockName()).toBe("Bad");
    const passCheck = "Mdp123456789.";
    const password = "Mdp123456789.";
    expect(password).toBe(passCheck);
    expect(password.length).toBeGreaterThanOrEqual(12);
}

)