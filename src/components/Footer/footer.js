import React from "react";

const Footer = () => {
  const socialLinks = [
    {
      src: "https://www.svgrepo.com/show/475647/facebook-color.svg",
      alt: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61556542791763&mibextid=ZbWKwL",
    },
    {
      src: "https://www.svgrepo.com/show/452229/instagram-1.svg",
      alt: "Instagram",
      href: "https://www.instagram.com/omerhafeez.pk?utm_source=qr&igsh=MTdmcjJ3c2NjbWIzYQ==",
    },
  ];

  return (
    <footer className="bg-blue-100/80 font-sans dark:bg-gray-900">
      <div className="container mx-auto py-4">
        <hr className="my-3 border-gray-200 md:my-4 dark:border-gray-700 h-2" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex flex-1 gap-4 hover:cursor-pointer">
            <img
              src="https://www.svgrepo.com/show/303139/google-play-badge-logo.svg"
              width="130"
              height="110"
              alt="Google Play"
            />
            <img
              src="https://www.svgrepo.com/show/303128/download-on-the-app-store-apple-logo.svg"
              width="130"
              height="110"
              alt="App Store"
            />
          </div>

          <div className="flex gap-4 mt-2 sm:mt-0">
            {socialLinks.map((icon) => (
              <a
                key={icon.alt}
                href={icon.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={icon.src}
                  width="30"
                  height="30"
                  alt={icon.alt}
                  className="hover:opacity-80 transition-opacity"
                />
              </a>
            ))}
          </div>
        </div>
        <p className="font-sans p-4 text-start md:text-center md:text-lg md:p-2">
          © NexusTech. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
