import React from "react";

export function Reviews(): JSX.Element {
  return (
    <div className="container padding-vert--lg">
      <h2 className="text--center margin-bottom--lg">Mentoring Reviews</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "2rem",
        }}
      >
        <section
          style={{
            height: "560px",
            boxShadow: "rgba(142, 151, 158, 0.15) 0px 4px 19px 0px",
            borderRadius: "16px",
            overflow: "hidden",
            width: "100%",
            maxWidth: "650px",
          }}
        >
          <iframe
            src="https://adplist.org/widgets/reviews?src=sajeetharan-sinnathurai"
            title="All Reviews"
            width="100%"
            height="100%"
            loading="lazy"
            style={{ border: "0px" }}
          ></iframe>
        </section>
        <section
          style={{
            padding: "1rem",
            width: "100%",
            maxWidth: "380px",
            height: "350px",
            boxShadow: "rgba(142, 151, 158, 0.15) 0px 4px 19px 0px",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <iframe
            src="https://adplist.org/widgets/impact?src=sajeetharan-sinnathurai"
            title="Impact"
            width="100%"
            height="100%"
            loading="lazy"
            style={{ border: "0px" }}
          ></iframe>
        </section>
      </div>
    </div>
  );
}
