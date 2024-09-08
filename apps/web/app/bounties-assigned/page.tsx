import { BountiesAssignedList } from './bountiesAssignedList';
import styles from "./bountiesAssignedList.module.css"

// Esta es una función asíncrona que obtendría las atestaciones asignadas al usuario
async function getAssignedBounties() {
  // Aquí iría la lógica para obtener las atestaciones asignadas desde tu API o base de datos
  // Por ahora, retornamos datos de ejemplo
  return [
    { id: 1, bountyName: "Diseño UI", status: "en progreso", description: "Diseñar la interfaz de usuario para la aplicación", creator: "0x1234...5678", amount: 2.5, deadline: new Date("2023-12-15") },
    { id: 2, bountyName: "Desarrollo Backend", status: "pendiente", description: "Implementar API RESTful para el servicio de usuarios", creator: "0xabcd...efgh", amount: 3.0, deadline: new Date("2024-01-20") },
    // Añade más bounties asignados según sea necesario
  ];
}

export default async function BountiesAssignedPage() {
  const assignedBounties = await getAssignedBounties();

  return (
    <div className={styles.main}>
      <BountiesAssignedList bounties={assignedBounties} />
    </div>
  );
}