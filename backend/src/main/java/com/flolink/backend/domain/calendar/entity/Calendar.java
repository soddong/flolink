package com.flolink.backend.domain.calendar.entity;

import com.flolink.backend.domain.calendar.entity.enumType.ColorType;
import com.flolink.backend.domain.calendar.entity.enumType.IconType;
import com.flolink.backend.domain.room.entity.Room;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@Table(name = "calendar")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@SQLRestriction("use_yn = true")
public class Calendar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "calendar_id")
    private int calendarId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    @Column(name = "icon", nullable = false)
    private IconType icon;

    @Column(name = "color", nullable = false)
    private ColorType color;

    @Column(name = "title", nullable = false, length = 256)
    private String title;

    @Column(name = "date", nullable = false)
    private LocalDateTime date;

    @Column(name = "content", nullable = false, length = 256)
    private String content;

    @Column(name = "tag")
    private String tag;

    @Builder.Default
    @Column(name = "create_at")
    private LocalDateTime createAt = LocalDateTime.now();

    @Builder.Default
    @Column(name = "use_yn")
    private boolean useYn = true;

}
