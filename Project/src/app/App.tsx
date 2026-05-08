import { Route, Routes } from "react-router-dom";
import { FilmPage, GenrePage, MainPage, ProfilePage } from "@/pages";
import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "@/api/User";
import { Auth, Footer, Header } from "@/components";
import { useAppDispatch } from "./store";
import { setProfile } from "./features/profileSlice";
import { useEffect } from "react";
import { GenresPage } from "@/pages/GenresPage";

import "./styles/app.scss";

export default function App() {
  const dispatch = useAppDispatch();

  const { data } = useQuery({
    queryFn: fetchUserProfile,
    queryKey: ["profile"],
  });

  useEffect(() => {
    if (data) {
      dispatch(setProfile(data));
    }
  }, [data, dispatch]);

  return (
    <>
      <Header />
      <Auth />
      <main>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/genres" element={<GenresPage />} />
          <Route path="/genres/:genreName" element={<GenrePage />} />
          <Route path="/films/:filmId" element={<FilmPage />} />
          <Route path="/profile/*" element={<ProfilePage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
