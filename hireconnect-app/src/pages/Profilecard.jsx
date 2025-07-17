import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Upload,
  User,
  Wallet,
  Bookmark,
  Settings,
  SunMedium,
  LogOut,
  Star,
  Share2,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import cx from "classnames";
import Navbar from "../components/Navbar";

const Profilecard = () => {
  /* ───────── sidebar toggle ───────── */
  const [open, setOpen] = useState(false);

  /* ───────── avatar uploader ──────── */
  const [photo, setPhoto] = useState(null);
  const fileRef = useRef(null);
  const pickPhoto = (e) => {
    const file = e.target.files?.[0];
    if (file) setPhoto(URL.createObjectURL(file));
  };

  /* ───────── navigation menu data ─── */
  const menu = [
    { to: "/profile", label: "Home", icon: Home },
    // ↓ triggers native gallery / file‑picker
    { label: "Upload Pic", icon: Upload, action: () => fileRef.current?.click() },
    { to: "/details", label: "Profile", icon: User },
    { to: "/wallet", label: "Wallet", icon: Wallet },
    { to: "/saved", label: "Saved Jobs", icon: Bookmark },
    { to: "/settings", label: "Settings", icon: Settings },
  ];

  const greet = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar /> 

      {/* ── Sidebar + content wrapper ── */}
      <div className="flex flex-col lg:flex-row lg:gap-8 px-4 py-4">
        {/* ── Sidebar ───────*/}
        <aside
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          className={cx(
            "bg-[#4d0892] text-white flex lg:flex-col gap-[6rem] py-5 px-4",
            "transition-[width] duration-300 flex-shrink-0",
            "lg:sticky lg:top-8",                      
            "lg:rounded-tl-[16px] lg:rounded-bl-[16px]",
            open ? "lg:w-[221px]" : "lg:w-[70px]",
            "w-full lg:w-auto"
          )}
        >
          {/* brand / theme toggle icon */}
          <div className="w-10 h-6 p-1 bg-white rounded mx-auto lg:mx-0 lg:mt-[12px]">
            <SunMedium className="text-gray-400 w-full h-full" />
          </div>

          {/* nav list */}
          <nav className="flex lg:flex-col flex-1 justify-between lg:justify-start gap-5">
            {menu.map(({ to, label, icon: Icon, action }) => {
              const buttonBody = (
                <>
                  <Icon size={20} className="text-[#4d0892] shrink-0" />
                  {open && <span className="text-[#4d0892] text-sm truncate">{label}</span>}
                </>
              );

              return action ? (
                <button
                  key={label}
                  type="button"
                  onClick={action}
                  className="flex items-center bg-white rounded-[3.5px] border border-transparent hover:border-white/50 px-1.5 py-0.5 gap-5"
                  style={{ width: open ? 189 : 48, height: 26.55 }}
                >
                  {buttonBody}
                </button>
              ) : (
                <NavLink
                  key={to}
                  to={to}
                  className="flex items-center bg-white rounded-[3.5px] border border-transparent hover:border-white/50 px-1.5 py-0.5 gap-5"
                  style={{ width: open ? 189 : 48, height: 26.55 }}
                >
                  {buttonBody}
                </NavLink>
              );
            })}
          </nav>

          {/* bottom buttons (theme & logout) */}
          <div className="hidden lg:flex flex-col gap-5">
            {[{ icon: SunMedium, label: "Light / Dark" }, { icon: LogOut, label: "Logout" }].map(
              ({ icon: Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  className="flex items-center bg-white rounded-[3.5px] px-2 py-0.5 gap-5"
                  style={{ width: open ? 189 : 48, height: 26.55 }}
                >
                  <Icon className="text-[#4d0892]" />
                  {open && <span className="text-[#4d0892] text-sm">{label}</span>}
                </button>
              )
            )}
          </div>
        </aside>

        {/* ── Main columns ───────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row flex-1 gap-4">
          {/* ---- Profile column -------------------------------- */}
          <section className="flex flex-col items-center border border-blue-300 rounded-[11px] p-6 sm:p-8 md:p-12 gap-7 w-full sm:max-w-xs lg:w-56">
            <div
              role="button"
              tabIndex={0}
              onClick={() => fileRef.current?.click()}
              onKeyDown={(e) => e.key === "Enter" && fileRef.current?.click()}
              className="cursor-pointer rounded-[8.45px] overflow-hidden w-full h-44"
            >
              {photo ? (
                <img src={photo} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                  Tap to upload
                </div>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={pickPhoto}
                className="hidden"
              />
            </div>

            {/* rating and verified */}
            <div className="flex items-center gap-2">
              <Star size={16} className="text-[#4d0892]" />
              <span className="text-sm font-medium">5.0</span>
              <span className="text-green-600 text-sm flex items-center gap-1">● Verified</span>
            </div>

            {/* share / email / call */}
            <div className="w-full flex justify-between px-4 py-2 border rounded">
              {[
                { Icon: Share2, label: "Share" },
                { Icon: Mail, label: "Email" },
                { Icon: Phone, label: "Call" },
              ].map(({ Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <Icon size={18} className="text-gray-600" />
                  <span className="text-xs">{label}</span>
                </div>
              ))}
            </div>

            {/* rate + location + CTA */}
            <h2 className="text-lg font-semibold">$10 – $50&nbsp;/&nbsp;hr</h2>
            <div className="flex items-center gap-2 text-sm">
              <a
                href="https://maps.google.com/?q=Nigeria"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:underline"
              >
                <MapPin size={16} /> Nigeria
              </a>
              <span className="text-green-600">· Online</span>
            </div>
            <button
              type="button"
              className="bg-[#4d0892] text-white rounded-[4.5px] w-full h-8 text-sm"
            >
              Book me
            </button>
          </section>

          {/* ---- Details panel --------------------------------- */}
          <section className="flex flex-col gap-2 w-full">
            <h4 className="text-sm text-gray-500">{greet()}</h4>
            <h1 className="text-2xl font-bold truncate">Andre&nbsp;Jones</h1>
            <p className="text-gray-600">Digital Marketer LLCs, MMP</p>

            {/* tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {["SEO", "Content", "Email"].map((t) => (
                <span
                  key={t}
                  className="border border-[#4d0892] text-[#4d0892] rounded-full px-2 py-1 text-xs"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* description */}
            <div className="border rounded p-2 mt-2 h-24 overflow-y-auto">
              <p className="text-sm leading-relaxed">
                Experienced growth marketer with <strong>7+ years</strong> helping startups increase
                MRR. Available for part‑time or project‑based contracts.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profilecard;