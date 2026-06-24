package pt.bookly.api.dto.blockout;

import jakarta.validation.constraints.NotBlank;
import org.jspecify.annotations.NonNull;

import java.time.LocalDate;
import java.time.LocalTime;

public class BlockoutRequest {
    @NonNull
    private LocalDate startDate;

    @NonNull
    private LocalDate endDate;

    private LocalTime startTime;
    private LocalTime endTime;
    private  String reason;

    @NotBlank
    private String type;

    public @NonNull LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(@NonNull LocalDate startDate) {
        this.startDate = startDate;
    }

    public @NonNull LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(@NonNull LocalDate endDate) {
        this.endDate = endDate;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
