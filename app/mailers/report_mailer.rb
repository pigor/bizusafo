class ReportMailer < ActionMailer::Base
  default from: "nao-responda@bizusafo.com.br"

  def daily_report(recipients:)
    @stories = Story.by_yesterday
    @recipients = recipients
    @date = Date.today.strftime("%d/%m/%y")

    mail(to: "nao_responda@bizusafo.com.br", bcc: @recipients, subject: I18n.t("notifications.daily_report.subject"))
  end

  def weekly_report(recipients:)
    @stories = Story.by_current_week.group_by { |story| story.created_at.to_date.strftime("%d/%m/%y") }
    @recipients = recipients
    @date = 7.days.ago.strftime("%d/%m/%y")

    mail(to: "nao_responda@bizusafo.com.br", bcc: @recipients, subject: I18n.t("notifications.weekly_report.subject"))
  end
end
