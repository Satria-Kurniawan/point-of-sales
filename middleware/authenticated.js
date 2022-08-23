export default function ({ redirect }) {
  if (localStorage.getItem("userToken") === null) {
    return redirect("/auth/login");
  }
}
