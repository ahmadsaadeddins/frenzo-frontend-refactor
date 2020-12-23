import React from "react";
import classNames from "classnames";

import moment from "moment";
import "moment/locale/ar";
import { convertToArabic } from "../helpers/numbersToAr";

// @material-ui/core components
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

// @material-ui icons
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import { makeStyles } from "@material-ui/core/styles";

import contactStyle from "assets/jss/material-kit-pro-react/views/aboutUsSections/contactStyle.js";

const useStyles = makeStyles(contactStyle);

export default function CardExampleListGroupsHeader({
  prayers,
  remainingToPrayer,
}) {
  const classes = useStyles();

  const now = new Date();

  return (
    <GridContainer>
      <GridItem
        md={1}
        sm={4}
        className={classNames(classes.mrAuto, classes.mlAuto)}
      >
        <Card style={{ width: "20rem" }}>
          <CardHeader color="success">
            {moment().format("Do MMMM YYYY dddd")}
          </CardHeader>
          <List component="nav">
            {/* الفجر  */}
            {now < prayers.fajr ? (
              <ListItem selected>
                <ListItemText
                  primary={`المتبقى لصلاه فجر : ${convertToArabic(
                    remainingToPrayer
                  )}`}
                />
              </ListItem>
            ) : null}
            <ListItem>
              <ListItemText
                primary={`الفجر : ${moment(prayers.fajr).format("h:mm")}`}
              />
            </ListItem>

            {/* الشروق */}
            {now >= prayers.fajr && now <= prayers.sunrise ? (
              <ListItem selected>
                <ListItemText
                  primary={`المتبقى على الشروق : ${convertToArabic(
                    remainingToPrayer
                  )}`}
                />
              </ListItem>
            ) : null}
            <ListItem>
              <ListItemText
                primary={`الشروق : ${moment(prayers.sunrise).format("h:mm")}`}
              />
            </ListItem>

            {/* الظهر */}
            {now >= prayers.sunrise && now <= prayers.dhuhr ? (
              <ListItem selected>
                <ListItemText
                  primary={`المتبقى على الظهر : ${convertToArabic(
                    remainingToPrayer
                  )}`}
                />
              </ListItem>
            ) : null}
            <ListItem>
              <ListItemText
                primary={`الظهر : ${moment(prayers.dhuhr).format("h:mm")}`}
              />
            </ListItem>

            {/* العصر  */}
            {now >= prayers.dhuhr && now <= prayers.asr ? (
              <ListItem selected>
                <ListItemText
                  primary={`المتبقى على العصر : ${convertToArabic(
                    remainingToPrayer
                  )}`}
                />
              </ListItem>
            ) : null}
            <ListItem>
              <ListItemText
                primary={`العصر : ${moment(prayers.asr).format("h:mm")}`}
              />
            </ListItem>

            {/* المغرب */}
            {now >= prayers.asr && now <= prayers.maghrib ? (
              <ListItem selected>
                <ListItemText
                  primary={`المتبقى على المغرب : ${convertToArabic(
                    remainingToPrayer
                  )}`}
                />
              </ListItem>
            ) : null}
            <ListItem>
              <ListItemText
                primary={`المغرب : ${moment(prayers.maghrib).format("h:mm")}`}
              />
            </ListItem>

            {/* العشاء */}
            {now >= prayers.maghrib && now <= prayers.isha ? (
              <ListItem selected>
                <ListItemText
                  primary={`المتبقى على العشاء : ${convertToArabic(
                    remainingToPrayer
                  )}`}
                />
              </ListItem>
            ) : null}
            <ListItem>
              <ListItemText
                primary={`العشاء : ${moment(prayers.isha).format("h:mm")}`}
              />
            </ListItem>

            {/* فجر الغد */}
            {now >= prayers.isha && now <= prayers.fajrTmrw ? (
              <ListItem selected>
                <li
                  style={{ color: "olive" }}
                >{`المتبقى على فجر الغد : ${convertToArabic(
                  remainingToPrayer
                )}`}</li>
                {/* <ListItemText
                  secondary={`المتبقى على فجر الغد : ${convertToArabic(
                    remainingToPrayer
                  )}`}
                /> */}
              </ListItem>
            ) : null}
            <ListItem>
              <ListItemText
                primary={`فجر الغد : ${moment(prayers.fajrTmrw).format(
                  "h:mm"
                )}`}
              />
            </ListItem>
          </List>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
