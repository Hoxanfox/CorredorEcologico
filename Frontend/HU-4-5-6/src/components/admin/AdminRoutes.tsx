// src/admin/AdminRoutes.tsx
import React from "react";
import { Route } from "react-router-dom";
import { AdminEstacionList } from "./AdminEstacionList";
import { AdminEstacionForm } from "./AdminEstacionForm";
import { EspecimenForm } from "./especimenes/EspecimenForm";
//import { EspecimenList } from "./especimenes/EspecimenList";
import { ActividadForm } from "./actividades/ActividadForm";
import { ActividadList } from "./actividades/ActividadList";

export const getAdminRoutes = (apiUrl: string) => [
  <Route
    key="admin-estaciones-list"
    path="admin/estaciones"
    element={<AdminEstacionList apiUrl={apiUrl} />}
  />,
  <Route
    key="admin-estaciones-create"
    path="admin/estaciones/create"
    element={<AdminEstacionForm apiUrl={apiUrl} />}
  />,
  <Route
    key="admin-estaciones-edit"
    path="admin/estaciones/:id/edit"
    element={<AdminEstacionForm apiUrl={apiUrl} />}
  />,
  <Route
    key="admin-especimenes"
    path="admin/especimenes"
    element={
      <>
        <EspecimenForm />
      </>
    }
  />,
  <Route
    key="admin-actividades"
    path="admin/actividades"
    element={
      <>
        <ActividadForm />
        <ActividadList />
      </>
    }
  />,
];
