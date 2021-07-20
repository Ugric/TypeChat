import { SecureLink } from "react-secure-link";
import Linkify from "react-linkify";
import { useState } from "react";
import ColorThief from "colorthief";

function ProfilePage({
  user,
}: {
  user: {
    profilePic: string;
    username: string;
    tag: string;
    backgroundImage: string | null;
    aboutme: string;
    [key: string]: any;
  };
}) {
  const [backgroundcolour, setbackgroundcolour] = useState({
    r: 86,
    g: 86,
    b: 255,
  });
  return (
    <div
      style={{
        backgroundImage: user.backgroundImage
          ? `url(/files/${user.backgroundImage})`
          : "",
        backgroundColor: `rgb(${backgroundcolour.r}, ${backgroundcolour.g}, ${backgroundcolour.b})`,
        padding: "1rem",
        backgroundRepeat: user.backgroundImage ? "no-repeat" : "",
        backgroundSize: user.backgroundImage ? "cover" : "",
        borderRadius: "10px",
        border: "solid 1px var(--light-bg-colour)",
        margin: "1rem",
        backgroundPosition: user.backgroundImage ? "center" : "",
      }}
    >
      <div
        style={{
          textAlign: "center",
        }}
      >
        <img
          alt="profile"
          src={"/files/" + user.profilePic}
          style={{
            maxHeight: "75px",
            maxWidth: "100%",
            height: "auto",
            width: "auto",
            borderRadius: "50%",
          }}
          onLoad={async (e: any) => {
            const colorThief = new ColorThief();
            const resp = await colorThief.getColor(e.target);
            setbackgroundcolour({ r: resp[0], g: resp[1], b: resp[2] });
          }}
        />
        <h4>
          <span
            style={{
              color: "white",
              WebkitTextStroke: "1px black",
              fontWeight: "bold",
            }}
          >
            {user.username}
            <span
              style={{
                color: "lightgray",
                fontWeight: "normal",
              }}
            >
              #{user.tag}
            </span>
          </span>
        </h4>
      </div>
      {user.aboutme ? (
        <div
          style={{
            padding: "1rem",
            backgroundColor: "var(--dark-bg-colour)",
            borderRadius: "10px",
            border: "solid 1px var(--light-bg-colour)",
          }}
        >
          <b>About Me</b>
          <div>
            <Linkify
              componentDecorator={(
                decoratedHref: string,
                decoratedText: string,
                key: any
              ) => (
                <SecureLink
                  href={decoratedHref}
                  key={key}
                  style={{ color: "var(--secondary-text-colour)" }}
                >
                  {decoratedText}
                </SecureLink>
              )}
            >
              {user.aboutme}
            </Linkify>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ProfilePage;
