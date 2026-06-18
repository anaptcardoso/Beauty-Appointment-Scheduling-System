package pt.bookly.api.repository;

public final class Queries {
    private Queries() {}

    // Returns all active services for a specific provider
    public static final String FIND_ACTIVE_SERVICES_BY_PROVIDER =
            "SELECT s FROM ServiceOffering s WHERE s.provider.id = :providerId AND s.active = true";

    //Returns all services for a specific provider (active and inactive)
    public static final String FIND_ALL_SERVICES_BY_PROVIDER =
            "SELECT s FROM ServiceOffering s WHERE s.provider.id = :providerId";


    // Finds a client by email address
    public static final String FIND_CLIENT_BY_EMAIL =
            "SELECT c FROM Client c WHERE c.email = :email";

    // Checks if a client with the given email already exists
    public static final String EXISTS_CLIENT_BY_EMAIL =
            "SELECT COUNT(c) > 0 FROM Client c WHERE c.email = :email";

    // Checks if a time conflict exists for a provider on a given date
    public static final String CHECK_APPOINTMENT_CONFLICT =
            """
            SELECT COUNT(a) > 0 FROM Appointment a
            WHERE a.provider.id = :providerId
            AND a.date = :date
            AND a.startTime < :endTime
            AND a.endTime > :startTime
            AND a.status != :status
            """;

    // Returns all appointments for a provider ordered by date and time
    public static final String FIND_APPOINTMENTS_BY_PROVIDER =
            """
            SELECT a FROM Appointment a
            WHERE a.provider.id = :providerId
            ORDER BY a.date DESC, a.startTime ASC
            """;


    // Returns all blockouts for a provider that overlap a given date range
    public static final String FIND_BLOCKOUTS_BY_PROVIDER_AND_DATE =
            """
            SELECT b FROM Blockout b
            WHERE b.provider.id = :providerId
            AND b.startDate <= :endDate
            AND b.endDate >= :startDate
            """;
}
