const supabase = require("../config/supabaseClient");

// Register a new user
exports.register = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      throw new Error(error.message);
    }
    return { user: data.user };
  } catch (error) {
    return { error: error.message };
  }
};

// Log in an existing user
exports.login = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw new Error(error.message);
    }
    return { user: data.user };
  } catch (error) {
    return { error: error.message };
  }
};
