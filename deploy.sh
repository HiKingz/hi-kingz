#!/usr/bin/env bash

cd frontend
ng build --prod
cd ..
firebase deploy
