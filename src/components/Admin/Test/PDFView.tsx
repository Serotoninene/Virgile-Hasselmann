import React from "react";
import {
  Document,
  Page,
  View,
  StyleSheet,
  Image,
  PDFViewer,
  Text,
  Font,
} from "@react-pdf/renderer";

// Register font
Font.register({
  family: "ExensaGrotesk",
  fonts: [
    { src: "/fonts/ExensaGrotesk-Regular.ttf" }, // font-style: normal, font-weight: normal
    { src: "/fonts/EGaeeknorsstx-Bold.ttf", fontWeight: 700 },
  ],
});

// Create styles
const styles = StyleSheet.create({
  container: {
    padding: "40px 32px",
    width: "100%",
    fontSize: 10,
    // fontFamily: "ExensaGrotesk",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    fontWeight: 400,
  },
  title: {
    marginBottom: 16,
    fontSize: 20,
    fontWeight: 700,
  },
  logo: { width: 40, height: 40, objectFit: "cover" },
  tableHeaders: {
    display: "flex",
    flexDirection: "row",
    fontSize: 8,
  },
  line: {
    height: 0.75,
    width: "100%",
    backgroundColor: "#1f1e1e",
    margin: "6 0",
  },
  rowLine: {
    marginBottom: 6,
  },
  totalLine: {
    borderTop: "0.24px solid #c5c4c4",
    borderBottom: "0.24px solid #c5c4c4",
    padding: "6 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bold: { fontWeight: "bold" },
  flex: { display: "flex", flexDirection: "row" },
});

const arr = [1, 2, 3, 4, 5];

// Create Receipt component
export const PDF = () => {
  return (
    <Document>
      <Page size="A4" style={styles.container}>
        {/* BODY */}
        <View>
          {/* HEADER */}
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Facture</Text>
              <View style={styles.rowLine}>
                <Text>Numéro de facture: #62626</Text>
              </View>
              <View style={styles.rowLine}>
                <Text>Date d&apos;émission: 17 Mai 2023</Text>
              </View>
            </View>
            <Image src="/assets/burgerBg.png" style={styles.logo} />
          </View>
          {/* Skop number + Facturer à */}
          <View
            style={{ display: "flex", flexDirection: "row", marginBottom: 48 }}
          >
            <View style={{ width: "50%" }}>
              <Text style={styles.bold}>Skop</Text>
              <Text style={{ marginTop: 6 }}>+33 6 50 59 09 28</Text>
            </View>
            <View style={{ width: "50%" }}>
              <Text style={styles.bold}>Facturer à </Text>
              <Text style={{ margin: "6 0 2 0" }}>Alexandre Pujol</Text>
              <Text>pujol.alexandre@hotmail.fr</Text>
            </View>
          </View>
          {/* Table headers */}
          <View style={styles.tableHeaders}>
            <View style={{ width: "50%" }}>
              <Text>Description</Text>
            </View>
            <View style={{ width: "15%" }}>
              <Text>Qté</Text>
            </View>
            <View style={{ width: "18%" }}>
              <Text>PrixUnitaire</Text>
            </View>
            <View style={{ width: "17%" }}>
              <Text style={{ textAlign: "right" }}>Montant</Text>
            </View>
          </View>
          <View style={styles.line} />
          {/* items */}
          {arr.map((a, idx) => {
            const border =
              idx === arr.length - 1 ? "none" : "0.24px solid #c5c4c4";
            return (
              <View
                key={a}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  paddingBottom: 20,
                  paddingTop: 2,
                  borderBottom: border,
                }}
              >
                <Text style={{ width: "50%" }}>Lorem ipsum dolor sit amet</Text>
                <Text style={{ width: "15%" }}>2</Text>
                <Text style={{ width: "18%" }}>30,00 €</Text>
                <Text style={{ width: "17%", textAlign: "right" }}>
                  30,00 €
                </Text>
              </View>
            );
          })}
          {/* Total */}
          <View style={styles.flex}>
            <View style={{ width: "50%" }}></View>
            <View style={{ width: "50%" }}>
              <View style={styles.totalLine}>
                <Text>Sous-total</Text>
                <Text>240 €</Text>
              </View>
              <View style={styles.totalLine}>
                <Text style={styles.bold}>Total</Text>
                <Text style={styles.bold}>240 €</Text>
              </View>
            </View>
          </View>
        </View>
        {/* FOOTER */}
        <View>
          <View style={styles.line} />
          <View style={{ marginTop: 20 }}>
            <Text style={{ fontSize: 8 }}>
              Skop est une entreprise individuelle enregistrée au RCS de
              Montpellier sous le numéro 888 888 888 888 888 888 888 888 888
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default function PDFView() {
  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="h-screen w-screen">
      <PDFViewer className="h-[200vh] w-full">
        <PDF />
      </PDFViewer>
    </div>
  );
}
