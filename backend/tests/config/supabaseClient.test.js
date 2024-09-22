jest.mock("@supabase/supabase-js", () => ({
  createClient: jest.fn(() => ({})),
}));

describe("Supabase Client", () => {
  let createClient;
  let supabase;

  beforeEach(() => {
    jest.resetModules();
    process.env.SUPABASE_URL = "https://databaseurl.com";
    process.env.SUPABASE_PUBLIC_ANON_KEY = "fake-keys";
    createClient = require("@supabase/supabase-js").createClient;
    supabase = require("../../config/supabaseClient");
  });

  it("should create a Supabase client", () => {
    expect(createClient).toHaveBeenCalledWith(
      "https://databaseurl.com",
      "fake-keys",
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
          detectSessionInUrl: false,
        },
      }
    );
  });

  it("should export the Supabase client", () => {
    expect(supabase).toBeDefined();
  });
});
