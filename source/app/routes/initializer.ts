import express from "express";
import FollowUpsRouter from "./followUp/FollowUpsRouter";
import EventsRouter from "./followUp/EventsRouter";
import ParticipantEventsRouter from "./followUp/ParticipantEventsRouter";

export default class RouterInitializer{
  public static initialize(app: express.Application){
    app.all('*', function (req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.header('Content-Type', 'application/json');
      next();
    });

    FollowUpsRouter.initialize(app);
    EventsRouter.initialize(app);
    ParticipantEventsRouter.initialize(app);
  }
}
