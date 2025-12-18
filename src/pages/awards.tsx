import React from "react";
import Layout from "@theme/Layout";
import styles from "./awards.module.scss";

interface Award {
  title: string;
  organization: string;
  year: string;
  description: string;
  image: string;
  category: "award" | "recognition" | "certification" | "speaking";
}

const awards: Award[] = [
  {
    title: "Microsoft Most Valuable Professional",
    organization: "Microsoft",
    year: "2017 - 2019",
    description:
      "Recognized as Microsoft MVP in Developer Technologies for exceptional technical community leadership, knowledge sharing, and contributions to the Microsoft developer ecosystem.",
    image: "/img/awards/mvp.jpg",
    category: "award",
  },
  {
    title: "Google Developer Expert",
    organization: "Google",
    year: "2015 - Present",
    description:
      "First Google Developer Expert from Sri Lanka in Web Technologies. Recognized for technical expertise, community contributions, and advocacy for Google technologies.",
    image: "/img/awards/gde.jpg",
    category: "award",
  },
  {
    title: "Stack Overflow Top Contributor",
    organization: "Stack Overflow",
    year: "2012 - Present",
    description:
      "#1 Stack Overflow contributor from Sri Lanka with global Top 10 ranking in Azure, Angular, and Azure Cosmos DB tags. Helping developers worldwide solve complex technical challenges.",
    image: "/img/awards/stackoverflow.jpg",
    category: "recognition",
  },
  {
    title: "99X Technology Leadership Award",
    organization: "99X Technology",
    year: "2018",
    description:
      "Recognized for outstanding technical leadership, innovation, and contributions to building high-quality software solutions for global clients.",
    image: "/img/awards/tech_leadership.jpg",
    category: "award",
  },
  {
    title: "Microsoft Certified Trainer",
    organization: "Microsoft",
    year: "Active",
    description:
      "Microsoft Certified Trainer authorized to deliver official Microsoft technical training and certifications, helping developers build skills in Microsoft technologies.",
    image: "/img/awards/mct.jpg",
    category: "award",
  },
];

const title = "Awards & Recognition";
const description =
  "Awards, certifications, and recognition received throughout my career.";

export default function Awards(): JSX.Element {
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = React.useState<string>("");

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const openModal = (image: string, title: string) => {
    setSelectedImage(image);
    setSelectedTitle(title);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setSelectedTitle("");
  };

  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <Layout title={title} description={description}>
      <main className={styles.awardsPage}>
        <div className="container">
          <header className={styles.header}>
            <h1>{title}</h1>
            <p className={styles.subtitle}>{description}</p>
          </header>

          <div className={styles.awardsGrid}>
            {awards.map((award, idx) => (
              <div key={idx} className={styles.awardCard}>
                <div
                  className={styles.imageContainer}
                  onContextMenu={handleContextMenu}
                  onDragStart={handleDragStart}
                  onClick={() => openModal(award.image, award.title)}
                >
                  <img
                    src={award.image}
                    alt={award.title}
                    className={styles.awardImage}
                    draggable="false"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="400" height="300" fill="%23f1f5f9"/><text x="50%" y="50%" text-anchor="middle" fill="%2394a3b8" font-family="Arial" font-size="18">Award Image</text></svg>';
                    }}
                  />
                  <div className={styles.imageOverlay}>
                    <span className={styles.categoryBadge}>
                      {award.category}
                    </span>
                    <div className={styles.viewHint}>
                      <span className={styles.viewIcon}>🔍</span>
                      <span>Click to view full size</span>
                    </div>
                  </div>
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.awardTitle}>{award.title}</h3>
                  <div className={styles.awardMeta}>
                    <span className={styles.organization}>
                      {award.organization}
                    </span>
                    <span className={styles.year}>{award.year}</span>
                  </div>
                  <p className={styles.description}>{award.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.notice}>
            <p>
              🏆 These images are for viewing purposes only and are protected
              from downloading to preserve their authenticity.
            </p>
          </div>
        </div>

        {selectedImage && (
          <div
            className={styles.modal}
            onClick={handleModalClick}
            onContextMenu={handleContextMenu}
          >
            <div className={styles.modalContent}>
              <button
                className={styles.closeButton}
                onClick={closeModal}
                aria-label="Close"
              >
                ✕
              </button>
              <h2 className={styles.modalTitle}>{selectedTitle}</h2>
              <img
                src={selectedImage}
                alt={selectedTitle}
                className={styles.modalImage}
                onContextMenu={handleContextMenu}
                onDragStart={handleDragStart}
                draggable="false"
              />
              <p className={styles.modalNotice}>
                🔒 This image is protected and cannot be downloaded
              </p>
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
}
