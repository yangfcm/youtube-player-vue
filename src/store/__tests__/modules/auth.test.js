import authStore from "../../modules/auth";
import axios from "../../../settings";
import { SIGN_IN, SIGN_OUT, CATCH_AUTH_ERROR } from "../../types";
import { userResponse, mockGoogleUser } from "../fixtures/auth";

describe("Test store for auth module", () => {
  let accessToken = "",
    context;
  const { getters, mutations, actions } = authStore;

  beforeEach(() => {
    Object.defineProperty(global, "localStorage", {
      value: {
        setItem: jest.fn((key, value) => {
          if (key === "access_token") {
            accessToken = value;
          }
        }),
        removeItem: jest.fn((key) => {
          if (key === "access_token") {
            accessToken = "";
          }
        }),
      },
      writable: true,
    });
    context = {
      commit: jest.fn(),
    };
  });

  it("signedIn getter should return null if user info is not available", () => {
    const state = { user: null };
    expect(getters.signedIn(state)).toBe(null);
  });
  it("signedIn getter should false if user is an empty object(not sign in)", () => {
    const state = { user: {} };
    expect(getters.signedIn(state)).toBe(false);
  });
  it("signedIn getter should return true if user info is fetched", () => {
    const state = { user: userResponse };
    expect(getters.signedIn(state)).toBe(true);
  });

  it("signIn action can get user info", async () => {
    axios.get.mockResolvedValue({
      data: userResponse,
    });
    await actions.signIn(context, mockGoogleUser);
    const mockAccessToken = `${mockGoogleUser.wc.token_type} ${mockGoogleUser.wc.access_token}`;
    expect(axios.get).toHaveBeenCalledWith(
      "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
      {
        headers: {
          Authorization: accessToken,
        },
      }
    );
    expect(context.commit).toHaveBeenCalledWith(SIGN_IN, userResponse);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "access_token",
      mockAccessToken
    );
  });

  it("signIn action can handle error", async () => {
    axios.get.mockRejectedValue("sign_in_error");
    await actions.signIn(context, mockGoogleUser);
    expect(context.commit).toHaveBeenCalledWith(CATCH_AUTH_ERROR);
  });
  it("signOut action can sign user out", () => {
    actions.signOut(context);
    expect(context.commit).toHaveBeenCalledWith(SIGN_OUT);
    expect(localStorage.removeItem).toHaveBeenCalledWith("access_token");
  });
  it("mutations for signIn action can set user state", () => {
    const state = {
      user: null,
    };
    mutations.SIGN_IN(state, userResponse);
    expect(state.user).toEqual(userResponse);
  });
  it("mutations for signOut action can clear user state", () => {
    const state = {
      user: userResponse,
    };
    mutations.SIGN_OUT(state);
    expect(state.user).toEqual({});
  });
  it("mutations for catchError can clear user state", () => {
    const state = {
      user: null,
    };
    mutations.CATCH_AUTH_ERROR(state);
    expect(state.user).toEqual({});
  });
});
