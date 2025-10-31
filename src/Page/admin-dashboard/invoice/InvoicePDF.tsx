import { Page, Text, View, Document, Image, Svg } from "@react-pdf/renderer";
import { styles } from "./style";

const InvoicePDF = ({ invoice }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.invoiceTitle}>INVOICE</Text>
        <Image src="/src/assets/Clean_Up_logo.png" style={styles.logo} />
      </View>

      <View style={styles.invoiceInfo}>
        <View style={styles.infoBlock}>
          <Text style={styles.infoText}>Invoice ID: {invoice.invoice_id}</Text>
          <Text style={styles.infoText}>
            Date Issued: {new Date(invoice.date_issued).toLocaleDateString()}
          </Text>
          <Text style={styles.infoText}>
            Due Date:{" "}
            {invoice.due_date
              ? new Date(invoice.due_date).toLocaleDateString()
              : "—"}
          </Text>
        </View>
        <View style={styles.infoBlock}>
          <Text style={styles.infoText}>
            Client: {invoice.client_name ?? "N/A"}
          </Text>
          <Text style={styles.infoText}>Building: {invoice.building_name}</Text>
          <Text style={styles.infoText}>Region: {invoice.region_name}</Text>
        </View>
      </View>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderCell}>Apartment</Text>
          <Text style={styles.tableHeaderCell}>Service</Text>
          <Text style={styles.tableHeaderCell}>Amount</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>
            {invoice.apartment_name?.join(", ") || "N/A"}
          </Text>
          <Text style={styles.tableCell}>{invoice.note}</Text>
          <Text style={styles.tableCell}>
            {invoice.total_amount.toFixed(2)} SAR
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.totalAmount}>
          Total: {invoice.total_amount.toFixed(2)} SAR
        </Text>
        {invoice.status === "paid" ? (
          <Text style={styles.statusPaid}>Status: Paid</Text>
        ) : (
          <Text style={styles.statusUnpaid}>Status: Unpaid</Text>
        )}
      </View>
    </Page>
  </Document>
);

export default InvoicePDF;
