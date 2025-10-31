import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    padding: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    objectFit: "contain"
  },
  invoiceTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  invoiceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  infoBlock: {
    width: '45%',
  },
  infoText: {
    fontSize: 10,
    marginBottom: 5,
  },
  table: {
    width: '100%',
    border: '1px solid #e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderBottom: '1px solid #e0e0e0',
  },
  tableHeaderCell: {
    padding: 10,
    fontSize: 10,
    fontWeight: 'bold',
    width: '25%',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1px solid #e0e0e0',
  },
  tableCell: {
    padding: 10,
    fontSize: 10,
    width: '25%',
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  totalAmount: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  statusPaid: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  statusUnpaid: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#f44336',
  },
});
