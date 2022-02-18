import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "../../components/Dashboard/Sidebar/SideBar";
import { getAllWithDrawHistory } from "../../store/storeIndex";
import { Container, ContentWrap } from "../WithDraw/WithDrawStyled";
import jsPDF from "jspdf";
import PrintIcon from "@mui/icons-material/Print";
import "jspdf-autotable";
import logo from "../../assets/Saudi-logo.png";

const History = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const withDraw = useSelector((state) => state.warehouse.withDrawHistory);
  useEffect(() => {
    dispatch(getAllWithDrawHistory());
  }, []);

  function formatDateAndTimeString(date) {
    var dd = (date.getDate() < 10 ? "0" : "") + date.getDate();

    var MM = (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1);

    return `${date.getFullYear()}-${MM}-${dd} ${
      (date.getHours() < 10 ? "0" : "") + date.getHours()
    }:${(date.getMinutes() < 10 ? "0" : "") + date.getMinutes()}:${
      (date.getSeconds() < 10 ? "0" : "") + date.getSeconds()
    }`;
  }

  const doc = new jsPDF();
  doc.autoTable({
    head: [["Product Name", "Customer Name", "quantity", "Withdraw Date Time"]],
    body: withDraw.map((report) => [
      report.product_name,
      report.name,
      report.requested_quantity,
      formatDateAndTimeString(new Date(report.withdraw_date_time)),
    ]),
  });

  return (
    <Container>
      <ContentWrap>
        <SideBar />
        <div className="container p-md-5">
          <div className="row">
            <div className="col-6">
              <h2>{t("history")}</h2>
            </div>
            <div className="col-6 add-btn ">
              <div
                onClick={() => {
                  const doc = new jsPDF();
                  doc.autoTable({
                    html: "#table",
                    margin: { top: 25 },
                    styles: {
                      minCellHeight: 15,
                    },

                    didDrawPage: (data) => {
                      doc.addImage(logo, "JPEG", 10, 0, 50, 25);
                    },
                    didDrawCell: (data) => {
                      if (data.section === "body" && data.column.index === 2) {
                        doc.addImage(
                          data.cell.raw.children[0].src,
                          "JPEG",
                          data.cell.x + 2,
                          data.cell.y + 2,
                          10,
                          10,
                        );
                      }
                    },
                  });
                  doc.save("table.pdf");
                }}
                className="btn btn-primary"
              >
                PDF
              </div>
            </div>
          </div>
          <div
            style={{
              height: "70vh",
              overflow: "auto",
            }}
            className="row mt-4"
          >
            <TableContainer component={Paper}>
              <Table
                id="table"
                sx={{ minWidth: 650 }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell width={50}>#</TableCell>
                    <TableCell width={150}>{t("productName")}</TableCell>
                    <TableCell width={150}>{t("signature")}</TableCell>
                    <TableCell width={150}>{t("name")}</TableCell>
                    <TableCell width={150}>{t("quantity")}</TableCell>
                    <TableCell width={150}>{t("withdrawDateTime")}</TableCell>
                    <TableCell width={50}>{t("action")}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {withDraw !== undefined &&
                    withDraw.map((product, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {index + 1}
                        </TableCell>
                        <TableCell>{product.product_name}</TableCell>
                        <TableCell>
                          <img
                            src={product.signature}
                            alt="signature"
                            style={{ width: "100px" }}
                          />
                        </TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.requested_quantity}</TableCell>
                        <TableCell>
                          {formatDateAndTimeString(
                            new Date(product.withdraw_date_time),
                          )}
                        </TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => {
                              const doc = new jsPDF();
                              doc.autoTable({
                                head: [
                                  [
                                    "Product Name",
                                    "Signature",
                                    "Customer Name",
                                    "quantity",
                                    "Withdraw Date Time",
                                  ],
                                ],
                                body: [
                                  [
                                    product.product_name,
                                    "",
                                    product.name,
                                    product.requested_quantity,
                                    formatDateAndTimeString(
                                      new Date(product.withdraw_date_time),
                                    ),
                                  ],
                                ],
                                margin: { top: 25 },
                                styles: {
                                  minCellHeight: 15,
                                },
                                didDrawPage: (data) => {
                                  doc.addImage(logo, "JPEG", 10, 0, 50, 25);
                                },
                                didDrawCell: (data) => {
                                  if (
                                    data.section === "body" &&
                                    data.column.index === 1
                                  ) {
                                    doc.addImage(
                                      product.signature,
                                      "JPEG",
                                      data.cell.x + 2,
                                      data.cell.y + 2,
                                      10,
                                      10,
                                    );
                                  }
                                },
                              });
                              doc.save("table.pdf");
                            }}
                          >
                            <PrintIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </ContentWrap>
    </Container>
  );
};

export default History;
